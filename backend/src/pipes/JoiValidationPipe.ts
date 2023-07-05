import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException({
                message: error.message,
                error: {
                    key: error.details[0].path[0],
                    value: error.details[0].context.value,
                    type: metadata.type,
                }
            });
        }
        return value;
    }
}