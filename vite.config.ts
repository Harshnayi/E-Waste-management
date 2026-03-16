import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: "image-save-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/api/log-recycle" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const { category, data, user, timestamp } = JSON.parse(body);
                const safeCategory = category.toLowerCase().replace(/[^a-z0-9]/gi, "_");
                const folderPath = path.resolve(__dirname, "recycle-logs");

                if (!fs.existsSync(folderPath)) {
                  fs.mkdirSync(folderPath);
                }

                const filePath = path.resolve(folderPath, `${safeCategory}.csv`);
                const fileExists = fs.existsSync(filePath);

                // Flatten data for CSV
                const flattenedData = typeof data === 'object' ? JSON.stringify(data).replace(/"/g, '""') : data;
                const csvRow = `"${timestamp}","${user}","${flattenedData}"\n`;

                if (!fileExists) {
                  const header = `"Timestamp","User","Details"\n`;
                  fs.writeFileSync(filePath, header + csvRow);
                } else {
                  fs.appendFileSync(filePath, csvRow);
                }

                // Trigger n8n Webhook for automation
                const n8nWebhookUrl = "https://nayiharsh.app.n8n.cloud/webhook-test/http://localhost:8080/recycle";
                fetch(n8nWebhookUrl, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ category, data, user, timestamp }),
                }).catch((err: any) => console.error("n8n Webhook Error:", err.message));

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else if (req.url === "/api/save-image" && req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const { imageBase64, username } = JSON.parse(body);
                const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, "base64");

                const now = new Date();
                const dateStr = now.toISOString().split("T")[0];
                const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

                const safeUsername = (username || "anonymous").replace(/[^a-z0-9]/gi, "_");
                const fileName = `${safeUsername}_${dateStr}_${timeStr}.png`;
                const folderPath = path.resolve(__dirname, "user-device-pics");

                if (!fs.existsSync(folderPath)) {
                  fs.mkdirSync(folderPath);
                }

                const filePath = path.resolve(folderPath, fileName);
                fs.writeFileSync(filePath, buffer);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: true, fileName }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
