# Указываем базовый образ
FROM node:18
# Устанавливаем рабочую директорию
WORKDIR /usr/src/app
# Копируем package.json и package-lock.json (или bun.lockb, если используете bun)
COPY package*.json ./

# Устанавливаем зависимости
RUN bun install
# Копируем остальные файлы проекта
COPY . .
# Генерируем Prisma
RUN bunx prisma generate
# Генерируем базовые данные в бд 
RUN bun seed

# Указываем команду для запуска приложения
CMD ["bun", "start:prod"]

# Открываем порт, на котором будет работать приложение
EXPOSE 4000
