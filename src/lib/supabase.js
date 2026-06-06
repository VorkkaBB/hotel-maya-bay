// Importamos la función 'createClient' directamente desde el SDK oficial de Supabase
import { createClient } from '@supabase/supabase-js'

// Obtenemos las credenciales desde nuestro archivo .env de forma segura.
// Nota: En el framework Astro, usamos 'import.meta.env' para leer estas variables 
// y el prefijo 'PUBLIC_' asegura que el navegador pueda acceder a ellas para conectarse.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Inicializamos y exportamos una única instancia del cliente de Supabase.
// Al exportarla, cualquier otra página (como el formulario de reservas o el panel de admin)
// importará exactamente esta misma conexión, optimizando el rendimiento del sitio.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)