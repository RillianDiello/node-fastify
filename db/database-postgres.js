import { randomUUID } from "crypto";
import { sql } from "../db.js";

export class DatabasePostgres {
  async listVideos(search) {
    if (search) {
      return await sql`SELECT * FROM videos WHERE title ILIKE ${
        "%" + search + "%"
      };`;
    }
    return await sql`SELECT * FROM videos;`;
  }
  async createVideo(video) {
    const id = randomUUID();
    await sql`INSERT INTO videos (title, description, duration) VALUES (${video.title}, ${video.description}, ${video.duration});`;
  }

  async updateVideo(id, video) {
    const { title, description, duration } = video;

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id};`;
  }

  async deleteVideo(id) {
    await sql`delete from videos where id = ${id};`;
  }
}
