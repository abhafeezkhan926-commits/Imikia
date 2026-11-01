export const modes=['light','dark','system'] as const;
export const themes=[
 {id:'original',name:'Original IMIKIA red',accent:'#ec0c0c',gradient:'linear-gradient(125deg,#ec0c0c,#ac0808)'},
 {id:'ocean',name:'Ocean blue',accent:'#3478f6',gradient:'linear-gradient(125deg,#3478f6,#16b9ce)'},
 {id:'violet',name:'Violet bloom',accent:'#8b5cf6',gradient:'linear-gradient(125deg,#7c3aed,#d65ac8)'},
 {id:'emerald',name:'Emerald tide',accent:'#139b80',gradient:'linear-gradient(125deg,#087f76,#31b99b)'},
 {id:'sunset',name:'Sunset glow',accent:'#df7035',gradient:'linear-gradient(125deg,#d65a37,#f1a244)'},
 {id:'indigo',name:'Midnight aurora',accent:'#6865e8',gradient:'linear-gradient(125deg,#6554d9,#269fc7)'},
 {id:'rose',name:'Rose garden',accent:'#ce527d',gradient:'linear-gradient(125deg,#bd458e,#eb856d)'}
] as const;
export type Mode=typeof modes[number];
export type ThemeId=typeof themes[number]['id'];
export type Appearance={mode:Mode;theme:ThemeId;avatarUrl:string};
export const defaultAppearance:Appearance={mode:'light',theme:'original',avatarUrl:''};
export const cloudinaryImage=/^https:\/\/res\.cloudinary\.com\//;
export function normalizeAppearance(value:Partial<Appearance>|null|undefined):Appearance{return {mode:modes.includes(value?.mode as Mode)?value!.mode as Mode:defaultAppearance.mode,theme:themes.some(t=>t.id===value?.theme)?value!.theme as ThemeId:defaultAppearance.theme,avatarUrl:typeof value?.avatarUrl==='string'&&cloudinaryImage.test(value.avatarUrl)?value.avatarUrl:''}}
