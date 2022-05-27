import { Movie } from "./movie";
import { User } from "./user";

export class Quote {
    id: number = null as any;
    text: string = '';
    person: string = '';
    theme: string = '';

    movie: Movie = new Movie();
    user: User = new User();
}
