/**`
 * A Base OVNI France case as exported in a CSV file
 */
export type BaseOvniFranceCase = {
  "Num cas": string
  "Départ.": string
  Ville: string
  Latitude: number
  Longitude: number
  "CR Observation": string
  "Typ Obs": string
  Date: string
  Heure: string
  /**
   * "00:00:03" or "N.C."
   */
  Durée: string
  "Nbre Objets": number
  "Type Objet": string
  Couleur: string
  Brillance: string
  "Effet visuel"?: string
  "Disp inst": boolean
  Vitesse?: string
  "Mouvement/type de vol": string
  Taille?: string
  "Type Entité"?: string
  "Nbre entité": number
  "Action entité": string[]
  "Effets témoin"?: string
  "Effet Physique"?: string
  "Nbre Témoins": number
  "Enq Off": boolean
  Météo: string
  Année: number
  Atter: boolean
}
