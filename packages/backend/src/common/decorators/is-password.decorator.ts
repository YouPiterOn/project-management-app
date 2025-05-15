import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isPassword',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: string) {
					return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be at least 8 characters long, and include uppercase, lowercase, and a number.`;
				},
			},
		});
	};
}
