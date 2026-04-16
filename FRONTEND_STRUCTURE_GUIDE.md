# Huong dan cau truc frontend cho project Vue cua ban

Tai lieu nay duoc viet theo dung cau truc hien tai trong project `vue-tutorial`.

## 1. Frontend nay dang duoc chia thanh cac lop nao

Project cua ban hien tai co cac nhom chinh trong `src/`:

```text
src/
  assets/
  components/
  layouts/
  router/
  services/
  stores/
  types/
  views/
  App.vue
  main.ts
```

Neu nhin theo luong chay, app dang di theo huong:

```text
main.ts
  -> App.vue
    -> router
      -> layout
        -> view
          -> component
            -> service
              -> api
                -> backend
```

## 2. Vai tro tung phan

### `main.ts`

Day la diem khoi dong cua app.

Trong project cua ban, file nay dang:

- tao app Vue
- dang ky Pinia
- dang ky Vue Router
- dang ky Toast
- mount app vao `#app`

Ban nen dat o day:

- cac plugin global
- config app cap cao

Ban khong nen dat o day:

- logic nghiep vu
- goi API trang cu the
- xu ly form

Vi du:

```ts
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

### `App.vue`

Day la vo ngoai cung cua giao dien.

Trong project nay, `App.vue` rat gon, chi co:

- `router-view`

Dieu nay dung, vi `App.vue` nen la shell tong quan, khong nen om logic cua page.

Ban co the dat:

- `router-view`
- provider wrapper
- global modal neu can

Ban khong nen dat:

- logic cua `Login`
- logic lay danh sach post

### `router/`

Thu muc nay dinh nghia duong dan va page nao duoc render.

Project cua ban dang tach:

- `/` dung `DefaultLayout`
- `/auth/*` dung `AuthLayout`

Y nghia:

- `router` quyet dinh page nao hien ra
- `layout` quyet dinh bo cuc chung cua page do

Ban nen dat trong `router`:

- path
- component route
- route guard neu can kiem tra dang nhap
- meta nhu `requiresAuth`

Ban khong nen dat:

- goi API
- validate form
- render chi tiet UI phuc tap

Vi du tu project:

```js
{
  path: '/auth',
  component: AuthLayout,
  children: [
    { path: 'login', component: Login },
    { path: 'register', component: Register }
  ]
}
```

### `layouts/`

Layout la khung dung chung cho nhieu trang.

Project cua ban co:

- `DefaultLayout.vue`: co `Header` + `router-view`
- `AuthLayout.vue`: boc trang login/register vao khung giua man hinh

Layout nen chua:

- header
- sidebar
- footer
- khung bo cuc chung

Layout khong nen chua:

- logic business rieng cua tung page
- API cua page
- form submit cua page

Nho nhu sau:

- layout = khung nha
- view = noi dung cua tung phong

### `views/`

Day la noi dai dien cho tung man hinh.

Project cua ban dang co:

- `HomePage.vue`
- `Login.vue`
- `Register.vue`
- `Profile.vue`

View nen chiu trach nhiem:

- lap ghep component
- dieu phoi du lieu cho page
- goi store/service o muc page
- xu ly action cua nguoi dung tren page

View khong nen:

- chua qua nhieu UI lap lai
- viet toan bo request HTTP truc tiep
- chua code co the tai su dung thanh component

Vi du:

- `Login.vue` gom form dang nhap, goi `authStore.login()`, toast va redirect
- `Profile.vue` lay thong tin nguoi dung, hien bai viet cua nguoi do, mo modal tao/sua post

### `components/`

Day la noi dat UI co the tai su dung.

Project cua ban co:

- `Header.vue`
- `Post.vue`
- `PostModal.vue`

Component nen chua:

- UI lap lai
- props
- emits
- local state nho phuc vu hien thi

Component khong nen:

- biet qua nhieu ve toan bo page
- dieu khien router cua ca app neu khong can
- om business logic qua lon

Quy tac de nho:

- component nhan data vao bang `props`
- component tra su kien ra bang `emit`
- page/view moi la noi quyet dinh tiep theo phai lam gi

Vi du dung:

`Post.vue`:

- nhan `post`
- nhan cờ `isAction`, `isReaction`
- phat ra `edit`, `delete`, `react`, `unreact`

Nghia la component chi phat tin hieu, con page se quyet dinh co xoa that hay khong.

### `services/`

Day la lop giao tiep voi backend.

Project cua ban dang tach kha dung:

- `api.ts`: tao axios instance va gan token
- `authService.ts`: login, register, logout
- `postService.ts`: get/create/update/delete post, reaction
- `userService.ts`: lay tai khoan, bai viet cua tai khoan
- `categoryService.ts`: lay category

Service nen chua:

- ham goi API
- mapping request/response don gian
- dung endpoint

Service khong nen chua:

- toast
- router push
- DOM handling
- code render giao dien

Vi du dung:

```ts
export const getPosts = async (): Promise<GetPostsResponse> => {
  const res = await api.get<GetPostsResponse>('/posts')
  return res.data
}
```

Neu muon de mo rong tot, hay giu quy tac:

- service chi biet backend
- service khong biet UI

### `stores/`

Store dung de giu state dung chung.

Project cua ban hien tai co `authStore.ts`, day la store hop ly nhat trong app hien tai vi:

- thong tin user dung o nhieu noi
- token can dung cho moi request

Store nen chua:

- state dung chung
- action cap cao lien quan state do
- doc/ghi localStorage neu can

Store khong nen:

- thay view lam moi thu
- chua state tam thoi chi dung trong 1 component
- chua qua nhieu state khong lien quan

Vi du hien tai:

- `authStore.login()` goi `authService.login()`
- luu `token`, `user`
- dong bo sang `localStorage`

Day la vi du dung vi auth la state global.

### `types/`

Day la noi khai bao kieu du lieu.

Project cua ban chia:

- `Object.ts`: User, Post, Category
- `Request.ts`: payload gui len server
- `Response.ts`: du lieu tra ve tu server

Tac dung:

- giup code ro rang
- goi API it loi hon
- editor goi y tot hon

Types nen chua:

- interface/type

Types khong nen chua:

- logic API
- render UI
- state runtime

### `assets/`

Noi dat tai nguyen tinh:

- CSS base
- logo
- anh co dinh

Khong nen dat vao day:

- du lieu dong tu API
- file logic TypeScript

## 3. Moi phan co the va khong the lam gi

### `views/`

Co the:

- goi `store`
- goi `service`
- gom nhieu `component`
- xu ly submit cua page

Khong nen:

- viet request HTTP raw lap lai khap noi
- chua UI tai su dung lon

### `components/`

Co the:

- nhan `props`
- `emit` event
- giu state UI nho nhu `expanded`, `open`, `loading` cuc bo

Khong nen:

- quan ly state global auth
- tu quyet dinh redirect toan app
- chua workflow business dai

### `services/`

Co the:

- goi `GET/POST/PUT/DELETE`
- dung `api.ts`
- tra `res.data`

Khong nen:

- toast success/error
- `router.push`
- `localStorage` cua toan app, tru khi day la helper dac biet

### `stores/`

Co the:

- giu `user`, `token`
- cung cap action nhu `login`, `logout`

Khong nen:

- thay the toan bo service
- chua state cuc bo cua modal tren 1 page

### `router/`

Co the:

- chia khu vuc `auth` va `main`
- bao ve route

Khong nen:

- goi endpoint post, user, category

## 4. Vi du xuyen suot de de hieu

Lay luong `Dang nhap` trong project cua ban:

### Buoc 1: nguoi dung nhap form trong `views/Login.vue`

`Login.vue` giu:

- `email`
- `password`
- `errors`

Khi submit:

```ts
const res = await useAuth.login({
  email: email.value,
  password: password.value
})
```

### Buoc 2: `stores/authStore.ts` nhan yeu cau

Store goi service:

```ts
const res = await login(data)
this.user = res.user || null
this.token = res.token || null
```

Va luu vao `localStorage`.

Ly do dat o store:

- user/token la state dung chung
- `Header.vue`, `Profile.vue`, `api.ts` deu can

### Buoc 3: `services/authService.ts` goi backend

Service chi lo request:

```ts
const res = await api.post<LoginResponse>('auth/login', data)
return res.data
```

### Buoc 4: `services/api.ts` tu dong gan token cho request sau do

Sau khi login xong, moi request khac co the dung:

```ts
config.headers.Authorization = `Bearer ${token}`
```

### Buoc 5: `components/Header.vue` doc state global

Header khong can goi lai API login.
No chi doc:

```ts
const authStore = useAuthStore()
```

Roi hien:

- user name/avatar neu da dang nhap
- nut login/register neu chua dang nhap

Do la mot luong tach lop dung:

```text
Login view
  -> auth store
    -> auth service
      -> api instance
        -> backend
```

## 5. Vi du xuyen suot thu hai: danh sach post

### Luong hien thi bai viet o `views/HomePage.vue`

`HomePage.vue`:

- goi `getPosts()`
- luu vao `posts`
- render `PostItem`

```ts
const res = await getPosts()
posts.value = res.posts ?? []
```

`Post.vue`:

- chi hien `title`, `content`, `author`, `category`
- phat ra su kien reaction

`postService.ts`:

- chiu trach nhiem goi endpoint `/posts`

Day la luong hop ly vi:

- view quan ly du lieu cua page
- component quan ly UI tung item
- service giao tiep backend

## 6. Cach toi khuyen ban xay project nay khi lon hon

Neu project lon dan, ban co the giu quy tac sau:

### Cach 1: giu nguyen kieu hien tai, nhung ky luat hon

```text
src/
  components/
  layouts/
  router/
  services/
  stores/
  types/
  views/
```

Phu hop khi:

- project nho hoac vua
- team it nguoi
- domain chua qua phuc tap

### Cach 2: tach theo module nghiep vu

Khi app lon hon, ban nen nhom theo feature:

```text
src/
  modules/
    auth/
      components/
      services/
      types/
      views/
    post/
      components/
      services/
      types/
    user/
      services/
      types/
  router/
  layouts/
  shared/
```

Phu hop khi:

- app co nhieu domain
- auth/post/user/category phat trien manh
- muon de tim code theo nghiep vu

Trong truong hop project cua ban hien tai, cau truc hien tai van on, chua bat buoc phai module hoa ngay.

## 7. Mot so quy tac thuc dung cho repo nay

### Nen

- `views` dieu phoi page
- `components` chi lo UI tai su dung
- `services` chi goi API
- `store` chi giu state global
- `types` de khai bao du lieu
- `layout` dung cho khung chung

### Khong nen

- goi axios truc tiep trong moi component
- nhieu noi cung sua `localStorage`
- de component con biet qua nhieu ve logic cua page cha
- dat toast/router/localStorage trong `service`
- dat business logic lon trong `router`

## 8. Vi du mot chuc nang moi nen viet o dau

Gia su ban muon them chuc nang `cap nhat avatar`.

Ban nen tach nhu sau:

### `types/Request.ts`

```ts
export interface UpdateAccountRequest {
  name?: string
  avatar?: string
}
```

### `services/userService.ts`

```ts
export const updateAccount = async (data: UpdateAccountRequest) => {
  const res = await api.put('users', data)
  return res.data
}
```

### `views/Profile.vue`

- tao form update
- submit form
- goi `updateAccount`
- toast ket qua
- cap nhat lai `user`

### Neu can tai su dung form

Tach them:

```text
components/ProfileForm.vue
```

De `Profile.vue` chi con viec dieu phoi.

## 9. Tom lai bang 1 cau de nho

Hay nho quy tac don gian nay:

- `view` dieu phoi
- `component` hien thi
- `service` goi API
- `store` giu state chung
- `router` chia duong
- `layout` dung khung
- `types` mo ta du lieu

Neu ban giu dung ranh gioi nay, project se de mo rong hon rat nhieu.
