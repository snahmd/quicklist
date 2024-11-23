// npx supabase login
// npx supabase init
// npx supabase gen types typescript --project-id "porhsqsnfjvczyzmrjxc" --schema public > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          ad_type: string;
          color: string | null;
          condition: string;
          created_at: string;
          description: string;
          id: string;
          postal_code: string;
          price: number;
          price_type: string;
          shipping: string;
          subcategory_id: string;
          title: string;
          user_id: string | null;
          views: number;
        };
        Insert: {
          ad_type: string;
          color?: string | null;
          condition: string;
          created_at?: string;
          description: string;
          id?: string;
          postal_code: string;
          price: number;
          price_type: string;
          shipping: string;
          subcategory_id?: string;
          title: string;
          user_id?: string | null;
          views?: number;
        };
        Update: {
          ad_type?: string;
          color?: string | null;
          condition?: string;
          created_at?: string;
          description?: string;
          id?: string;
          postal_code?: string;
          price?: number;
          price_type?: string;
          shipping?: string;
          subcategory_id?: string;
          title?: string;
          user_id?: string | null;
          views?: number;
        };
        Relationships: [
          {
            foreignKeyName: "articles_subcategory_id_fkey";
            columns: ["subcategory_id"];
            isOneToOne: false;
            referencedRelation: "sub_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "articles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      categories: {
        Row: {
          bg_color: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string;
        };
        Insert: {
          bg_color?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name: string;
        };
        Update: {
          bg_color?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          article_id: string;
          created_at: string;
          id: string;
          read: boolean;
          title: string;
        };
        Insert: {
          article_id: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          title: string;
        };
        Update: {
          article_id?: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          profile_name: string | null;
        };
        Insert: {
          avatar?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          profile_name?: string | null;
        };
        Update: {
          avatar?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          profile_name?: string | null;
        };
        Relationships: [];
      };
      sub_categories: {
        Row: {
          category_id: string | null;
          created_at: string;
          id: string;
          name: string | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sub_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      user_info: {
        Row: {
          address_addition: string | null;
          city: string | null;
          created_at: string;
          first_name: string | null;
          house_no: string | null;
          id: string;
          last_name: string | null;
          postal_code: string | null;
          street: string | null;
        };
        Insert: {
          address_addition?: string | null;
          city?: string | null;
          created_at?: string;
          first_name?: string | null;
          house_no?: string | null;
          id?: string;
          last_name?: string | null;
          postal_code?: string | null;
          street?: string | null;
        };
        Update: {
          address_addition?: string | null;
          city?: string | null;
          created_at?: string;
          first_name?: string | null;
          house_no?: string | null;
          id?: string;
          last_name?: string | null;
          postal_code?: string | null;
          street?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
