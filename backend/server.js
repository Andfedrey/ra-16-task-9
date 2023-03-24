const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

let posts = [];
let nextId = 1;

const router = new Router();

router.get('/posts', async (ctx, next) => {
    ctx.response.body = posts;
});
router.get('/posts/:id', async (ctx, next) => {
    const params = ctx.params.id
    const post = posts.find(el => el.id === params);
    ctx.response.body = post;
})
router.post('/posts', async (ctx, next) => {
    const { id, content } = ctx.request.body;
    if (id !== 0) {
        posts = [...posts, { id, content, created: Date.now() }]
        posts.map((el) => el.id !== id ? el : { ...el, content })
        ctx.response.status = 204;
        return;
    }
    posts.push({ ...ctx.request.body, id: nextId++, created: Date.now() });
    ctx.response.status = 204;
});

router.put('/posts/:id', async (ctx, next) => {
    const { content } = ctx.request.body;
    const params = ctx.params.id
    const postId = posts.findIndex(el => el.id === params);
    console.log(content, '<<< content');
    posts[postId].content = content
    ctx.response.status = 204;
});

router.delete('/posts/:id', async (ctx, next) => {
    const postId = ctx.params.id;
    const index = posts.findIndex(el => el.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => {
    console.log(`server started http://localhost:${port}`)
});
