import { NotFoundException } from "routeify-express";
import { CreateCatDto, UpdateCatDto } from "./dto";

export interface Cat {
  id: number;
  name: string;
  age: number;
}

export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto): Cat {
    const createdCat = this.cats.push({
      id: this.cats.length + 1,
      ...cat,
    });
    return this.cats[createdCat - 1];
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) throw new NotFoundException("Cat not found");
    return cat;
  }

  update(id: number, cat: UpdateCatDto): Cat {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) throw new NotFoundException("Cat not found");
    this.cats[index] = {
      id: id,
      ...cat,
    };
    return this.cats[index];
  }

  delete(id: number): void {
    const index = this.cats.findIndex((cat) => cat.id === id);
    if (index === -1) throw new NotFoundException("Cat not found");
    this.cats.splice(index, 1);
  }
}
