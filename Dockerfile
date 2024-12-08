# Указываем базовый образ
FROM node:18
# Устанавливаем рабочую директорию
WORKDIR /usr/src/app
# Копируем package.json и package-lock.json (или bun.lockb, если используете bun)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install
# Копируем остальные файлы проекта
COPY . .
# Генерируем Prisma
RUN npx prisma generate
# Генерируем базовые данные в бд 
RUN npm run seed

# Указываем команду для запуска приложения
CMD ["npm", "run", "start:prod"]

# Открываем порт, на котором будет работать приложение
EXPOSE 4000
