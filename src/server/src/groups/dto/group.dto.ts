import { IsNumber, IsOptional, IsString, Min } from "class-validator";


export class GroupDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  semester: number;
}
