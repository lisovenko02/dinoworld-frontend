type EraTypes =
  | 'Holocene'
  | 'Late Cretaceous'
  | 'Early Cretaceous'
  | 'Late Triassic'
  | 'Early Jurassic'

export interface Product {
  id: string
  dinoName: string
  image: string
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Legendary'
  type: 'Dinosaurs' | 'Flying reptiles' | 'Marine reptiles'
  price: number
  description: string
  era: EraTypes
  family: string
  diet: 'Carnivore' | 'Herbivore' | 'Piscivore'
  attack: number
  defense: number
  appeal: number
  likes: string
  dislikes: string
}
