import { Movie } from "./movie";
import { User } from "./user";

export class Comm {
    id: number = null as any;
    text: string = '';
    likes: number[] = [];
    date: string = '';

    movie: Movie = new Movie();
    user: User = new User();
}
