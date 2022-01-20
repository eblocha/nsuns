export enum LiftTypes {
  MAIN = 'main',
  CUSTOM = 'custom',
}

export enum Units {
  KG = 'kg',
  LB = 'lb',
}

// Lift Sets ------------------------------------------------------------------
export type MainLiftSet = {
  id: string
  reps: number | string
  percentage: number
}

export type CustomLiftSet = {
  id: string
  reps?: number | string
  description?: string
  weight?: number | string
}

// Lifts ----------------------------------------------------------------------
export type MainLift = {
  id: string
  type: LiftTypes.MAIN
  name: string
  base: string
  sets: MainLiftSet[]
}

export type CustomLift = {
  id: string
  type: LiftTypes.CUSTOM
  name: string
  sets?: CustomLiftSet[]
  description?: string
}

export type Lift = MainLift | CustomLift

export type CompiledProgram = {
  [day in Day]?: CustomLift[]
}

// User Data ------------------------------------------------------------------

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type Program = {
  [day in Day]?: Lift[]
}

export type Maxes = {
  [lift: string]: number
}

export type Reps = {
  [lift: string]: number | null
}

export type Unified = {
  program: Program
  maxes: Maxes[]
  reps: Reps[]
  user: User
}

export type User = {
  name: string
}

export enum Keys {
  PROGRAM = 'program',
  MAXES = 'maxes',
  REPS = 'reps',
  USER = 'user',
}
