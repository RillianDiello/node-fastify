import "dotenv/config";
import { fastify } from "fastify";
import { DatabasePostgres } from "./db/database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.createVideo({
    title,
    description,
    duration,
  });
  return reply.code(201).send({ hello: "video save" });
});

server.get("/videos", async (request, reply) => {
  const search = request.query.search;
  const videos = await database.listVideos(search);
  return reply.send({ videos });
});

server.put("/videos/:id", async (request, reply) => {
  const { id } = request.params;
  const { title, description, duration } = request.body;

  await database.updateVideo(id, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});
server.delete("/videos/:id", async (request, reply) => {
  const { id } = request.params;

  database.deleteVideo(id);
  return reply.status(204).send();
});
server.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ?? 3333,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
