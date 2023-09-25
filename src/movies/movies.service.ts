import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  //임시 데이터베이스
  // 실제로는 데이터베이스가 들어가야 함
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // 실제로는 쿼리문이 들어가야 함
    return this.movies;
  }

  getOne(id: number): Movie {
    // +id는 string을 number로 바꿔줌
    //parseInt(id)와 같은 역할
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
