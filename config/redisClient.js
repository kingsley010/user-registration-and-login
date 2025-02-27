import redis from 'redis';
const redisClient = redis.createClient();

client.on("error", (err) => console.error("Redis Error:", err));
client.on("connect", () => console.log("Connected to Redis"));

client.connect();

export default redisClient;
