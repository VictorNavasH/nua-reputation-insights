
# NÜA Smart Reputation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <img src="public/lovable-uploads/c498e84d-246f-473c-9083-d0e6c74beabf.png" alt="NÜA Smart Reputation Logo" width="200">
  <h3>Inteligencia Artificial para la gestión de la reputación de restaurantes</h3>
</div>

## 🌟 Acerca de

NÜA Smart Reputation es una aplicación diseñada para ayudar a los restaurantes a gestionar y analizar su reputación online. Utilizando algoritmos de inteligencia artificial, la plataforma analiza reseñas de clientes, identifica tendencias y proporciona información valiosa para mejorar la calidad del servicio.

## ✨ Características

- **Dashboard Completo**: Visión general de todos los KPIs de reputación.
- **Análisis de Sentimiento**: Categorización automática de reseñas en positivas, neutras o negativas.
- **Respuesta con IA**: Genera respuestas profesionales a las reseñas de los clientes.
- **Seguimiento de Progreso**: Monitoriza la evolución de la reputación a lo largo del tiempo.
- **Análisis Detallado**: Profundiza en los comentarios para identificar áreas de mejora.
- **Gestión de Objetivos**: Establece y hace seguimiento de metas de reputación.

## 🚀 Tecnologías

- **Frontend**: React, TypeScript, Vite
- **UI/UX**: Tailwind CSS, shadcn-ui
- **Datos**: Tanstack React Query
- **Visualización**: Recharts
- **Routing**: React Router
- **Backend**: Supabase (PostgreSQL)

## 🔧 Instalación

```bash
# Clona el repositorio
git clone https://github.com/nua-restaurants/smart-reputation.git

# Navega al directorio
cd smart-reputation

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## 📱 Capturas de Pantalla

<div align="center">
  <p><strong>Dashboard Principal</strong></p>
  <p>Visualización del panel principal con KPIs, análisis de sentimiento y tendencias de reseñas.</p>
</div>

<div align="center">
  <p><strong>Gestión de Reseñas</strong></p>
  <p>Interfaz para responder a las reseñas de clientes con asistencia de IA.</p>
</div>

## 📝 Uso

1. **Dashboard**: Visualiza KPIs y tendencias de reputación.
2. **Reseñas**: Gestiona y responde a reseñas de clientes.
3. **Análisis**: Explora datos detallados sobre los comentarios de los clientes.
4. **Objetivos**: Establece metas para mejorar la reputación.
5. **Configuración**: Integra con plataformas externas y personaliza la aplicación.

## 🛠️ Implementación de Lógica Real

Actualmente, la aplicación utiliza funciones simuladas para mostrar datos de ejemplo. A continuación se detallan los componentes y acciones que requieren implementación real:

### 1. Integración con APIs externas

#### Configuración de APIs (src/components/settings/ApiIntegrationForm.tsx)
- Reemplazar el código simulado de conexión con Google, TripAdvisor y Yelp con llamadas reales a las APIs correspondientes.
- Implementar el almacenamiento seguro de claves API en Supabase.
- Crear funciones Edge en Supabase para las conexiones que requieran autenticación segura.

```typescript
// Ejemplo de implementación para la conexión con Google Reviews
const connectToGoogleAPI = async (apiKey: string) => {
  try {
    // Llamada real a la API de Google utilizando la clave proporcionada
    // Almacenar la respuesta en Supabase
    return { success: true };
  } catch (error) {
    console.error("Error connecting to Google API:", error);
    return { success: false, error };
  }
};
```

#### Sincronización de Reseñas (src/hooks/useReviews.ts)
- Implementar un sistema de sincronización periódica para mantener las reseñas actualizadas.
- Crear mecanismos de manejo de errores y reintentos para conexiones fallidas.

### 2. Análisis de Sentimiento

#### Implementación de IA (src/components/dashboard/SentimentAnalysis.tsx)
- Conectar con servicios de NLP como OpenAI o Google NLP para análisis de sentimiento real.
- Desarrollar algoritmos para identificar temas recurrentes en las reseñas.
- Crear un sistema de alertas para reseñas negativas que requieran atención inmediata.

```typescript
// Ejemplo de función para análisis de sentimiento con OpenAI
const analyzeSentiment = async (reviewText: string) => {
  const response = await fetch('/api/analyze-sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: reviewText }),
  });
  
  return await response.json();
};
```

### 3. Generación de Respuestas con IA (src/components/reviews/ReviewResponseDialog.tsx)
- Sustituir las respuestas predefinidas por generación real con modelos de lenguaje.
- Implementar personalización basada en el tipo de reseña y el sentimiento detectado.
- Crear un sistema de aprobación de respuestas antes del envío.

### 4. Almacenamiento en Base de Datos (Supabase)
- Configurar las tablas necesarias en Supabase para reseñas, análisis y configuraciones.
- Implementar políticas de Row Level Security (RLS) para proteger los datos.
- Crear índices para optimizar las consultas frecuentes.

### 5. Sistema de Traducción (para reseñas en otros idiomas)
- Integrar servicios de traducción automática para reseñas en idiomas extranjeros.
- Implementar detección automática de idioma si no viene en los metadatos.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee las [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

## 📞 Contacto

Para más información, contacta con [info@nua-restaurants.com](mailto:info@nua-restaurants.com).

---

<p align="center">Desarrollado con ❤️ por NÜA Restaurants</p>
