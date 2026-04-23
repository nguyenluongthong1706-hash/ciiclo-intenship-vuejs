export interface User{
  id: string,
  name : string,
  email : string,
  role : 'USER' | 'ADMIN',
  avatar : string,
  is_active : boolean,
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  category: {id:string, name:string}
  author: { id:string,  name: string }
  is_active : boolean,
  created_at: string,
  updated_at: string,
  reaction_count: any
  my_reaction: any
}

export interface Category {
  id: string,
  name: string,
  is_active : boolean,
  created_at: string,
  updated_at: string,
}

export type  ReactionType =  'like'|'dislike'|'love'|'angry'
