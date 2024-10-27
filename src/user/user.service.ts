import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { TokenType } from 'prisma/__generated__';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async allUser() {
    const user = await this.prismaService.user.findMany({});
    return user;
  }

  public async genInvite(adminEmail: string) {
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
}
