import { InjectionKey } from 'vue'

const titleKey = Symbol() as InjectionKey<string>

const descKey = Symbol() as InjectionKey<Number>

const numRefKey = Symbol() as InjectionKey<Ref<number>>

export type ThemeType = 'light' | 'dark'

const THEMEKEY = Symbol() as InjectionKey<Ref<ThemeType>>

export { titleKey, descKey, numRefKey, THEMEKEY }
