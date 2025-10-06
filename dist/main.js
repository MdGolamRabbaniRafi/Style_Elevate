"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./Seed/seed.service");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Farseit API')
            .setDescription('API documentation for Farseit backend')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(7000);
        common_1.Logger.log('------------------------------------------------------------');
        common_1.Logger.log('PG Database');
        common_1.Logger.log('------------------------------------------------------------');
        common_1.Logger.log(`Host: ${process.env.DATABASE_HOST}`);
        common_1.Logger.log(`Port: ${process.env.DATABASE_PORT}`);
        common_1.Logger.log(`User: ${process.env.DATABASE_USER}`);
        common_1.Logger.log(`Password: ${process.env.DATABASE_PASSWORD}`);
        common_1.Logger.log(`Database: ${process.env.DATABASE_NAME}`);
        common_1.Logger.log('------------------------------------------------------------');
        common_1.Logger.log('Email');
        common_1.Logger.log('------------------------------------------------------------');
        common_1.Logger.log(`Host: ${process.env.EMAIL_HOST}`);
        common_1.Logger.log(`From: ${process.env.EMAIL_FROM}`);
        common_1.Logger.log(`User: ${process.env.EMAIL_USER}`);
        common_1.Logger.log(`Pass: ${process.env.EMAIL_PASS}`);
        common_1.Logger.log(`Port: ${process.env.EMAIL_PORT}`);
        common_1.Logger.log('------------------------------------------------------------');
        if (process.env.SEED === 'true') {
            try {
                const seedService = app.get(seed_service_1.SeedService);
                common_1.Logger.log('Running seed...');
                await seedService.runSeed();
                common_1.Logger.log('Seeding completed.');
                await app.close();
            }
            catch (error) {
                console.error('Error during seed:', error);
                common_1.Logger.error('Error during seed', error);
                await app.close();
            }
        }
    }
    catch (error) {
        console.error('Error during bootstrap:', error);
        common_1.Logger.error('Error during bootstrap', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map