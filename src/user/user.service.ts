import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { TokenType, UserRole } from 'prisma/__generated__';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async allUser() {
    const user = await this.prismaService.user.findMany({});
    return user;
  }

  public async genInvite(adminEmail: string) {
    const existingToken = await this.prismaService.token.findFirst({
      where: { email: adminEmail, type: TokenType.INVITE },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: { id: existingToken.id },
      });
    }

    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 86400 * 1000);

    const inviteToken = await this.prismaService.token.create({
      data: {
        email: adminEmail,
        token,
        expiresIn,
        type: TokenType.INVITE,
      },
    });

    return inviteToken;
  }

  public async getInviteTokens(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const inviteTokens = await this.prismaService.token.findMany({
      where: { email: user.email, type: TokenType.INVITE },
    });

    return inviteTokens;
  }

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async updateRole(requesterId: string, id: string, newRole: UserRole) {
    const user = await this.findById(id);
    if (user.role === newRole) {
      throw new ConflictException('User role is already the same');
    }

    if (requesterId === id) {
      throw new ConflictException('You cannot change your own role');
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { role: newRole },
    });

    return updatedUser;
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        isVerified,
      },
    });

    return user;
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        displayName: dto.name,
      },
    });

    return updatedUser;
  }
}
