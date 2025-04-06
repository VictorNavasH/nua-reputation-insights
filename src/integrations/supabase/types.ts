export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "NÜA Reviews": {
        Row: {
          fecha: string
          foto_autor: string
          idioma: string
          nombre: string
          puntuacion: number
          reseña: string
          review_id: string | null
          tiempo_relativo: string
          timestamp: string
          traducida: string
          url_perfil: string
          UUID: string
        }
        Insert: {
          fecha: string
          foto_autor: string
          idioma: string
          nombre: string
          puntuacion: number
          reseña: string
          review_id?: string | null
          tiempo_relativo: string
          timestamp: string
          traducida: string
          url_perfil: string
          UUID?: string
        }
        Update: {
          fecha?: string
          foto_autor?: string
          idioma?: string
          nombre?: string
          puntuacion?: number
          reseña?: string
          review_id?: string | null
          tiempo_relativo?: string
          timestamp?: string
          traducida?: string
          url_perfil?: string
          UUID?: string
        }
        Relationships: []
      }
      sync_status: {
        Row: {
          duplicadas: number | null
          fecha_sync: string | null
          fuente: string
          id: number
          mensaje: string | null
          nuevas: number | null
        }
        Insert: {
          duplicadas?: number | null
          fecha_sync?: string | null
          fuente: string
          id?: number
          mensaje?: string | null
          nuevas?: number | null
        }
        Update: {
          duplicadas?: number | null
          fecha_sync?: string | null
          fuente?: string
          id?: number
          mensaje?: string | null
          nuevas?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      reseñas_actuales: {
        Row: {
          fecha: string | null
          foto_autor: string | null
          idioma: string | null
          nombre: string | null
          puntuacion: number | null
          reseña: string | null
          review_id: string | null
          tiempo_relativo: string | null
          timestamp: string | null
          traducida: string | null
          url_perfil: string | null
          UUID: string | null
        }
        Insert: {
          fecha?: string | null
          foto_autor?: string | null
          idioma?: string | null
          nombre?: string | null
          puntuacion?: number | null
          reseña?: string | null
          review_id?: string | null
          tiempo_relativo?: string | null
          timestamp?: string | null
          traducida?: string | null
          url_perfil?: string | null
          UUID?: string | null
        }
        Update: {
          fecha?: string | null
          foto_autor?: string | null
          idioma?: string | null
          nombre?: string | null
          puntuacion?: number | null
          reseña?: string | null
          review_id?: string | null
          tiempo_relativo?: string | null
          timestamp?: string | null
          traducida?: string | null
          url_perfil?: string | null
          UUID?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
