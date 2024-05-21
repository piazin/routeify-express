import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCatDto {
  @IsString()
  @Length(1, 20)
  name: string;

  @IsNotEmpty()
  age: number;
}

export class UpdateCatDto extends CreateCatDto {}
