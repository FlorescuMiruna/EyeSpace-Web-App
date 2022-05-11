import { Movie } from "./movie";
import { User } from "./user";

export class Rating {
    id: number = null as any;
    ratingValue: number=0;

    movie: Movie = new Movie();
    user: User = new User();
}
