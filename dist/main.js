"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet = require('helmet');
require('pg').defaults.parseInt8 = true;
async function bootstrap() {
    const port = +process.env.PORT || 3001;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: false,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'blob:'],
            },
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Clartias')
        .setDescription('ClartitasAPIs')
        .setVersion('1.0')
        .addTag('Claritas')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map