# 易宿 本地后端（示例）

轻量 Node.js + Express 后端，使用 SQLite 持久化酒店、房型、订单和商家提交数据，适合在本地快速开发与联调。

快速开始

1. 确保已安装 Node.js（14+）
2. 进入项目目录（包含 `server.js` 的目录）

```bash
npm install
npm run start
```

说明

- 启动后服务默认监听 `http://localhost:3000`。
- 前端页面文件（如 `dashboard.html`, `hotel-edit.html`, `hotel-detail.html` 等）会被静态托管在根路径下。
- 数据库文件位于 `data/db.sqlite`。

主要 API（示例）

- GET /api/hotels
- GET /api/hotels/:id
- POST /api/hotels
- PUT /api/hotels/:id
- DELETE /api/hotels/:id

- GET /api/hotels/:id/rooms
- POST /api/hotels/:id/rooms
- PUT /api/hotels/:id/rooms/:roomId
- DELETE /api/hotels/:id/rooms/:roomId

- GET /api/submissions
- POST /api/submissions
- POST /api/submissions/:id/approve
- POST /api/submissions/:id/reject

- GET /api/orders/:hotelId
- PUT /api/orders/:hotelId

前端改造建议

- 将原本读取/写入 `localStorage` 的逻辑逐步替换为调用上述 API（fetch），作为渐进式改造：
  - 首先替换列表读取：使用 `GET /api/hotels` 和 `GET /api/submissions` 代替 `localStorage` 查询。
  - 编辑/新增：用 `POST /api/submissions`（商家提交）或 `POST /api/hotels`（直接写入主库）代替直接写入 `localStorage`。
  - 审核：管理员调用 `POST /api/submissions/:id/approve`。

注意

- 该后端为示例开发用途，未包含鉴权、上传图片持久化到文件系统（前端仍可存 DataURL 到 `image` 字段）或复杂事务处理，生产环境需补充。
