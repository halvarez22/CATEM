
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalyzedReport } from '../types';

// IMPORTANT: This key is managed by the execution environment. Do not change this line.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const mockAnalyzeReport = async (description: string): Promise<AnalyzedReport> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const categories = ['Acoso', 'Violación de Seguridad', 'Corrupción', 'Práctica Laboral Injusta'];
    const severities: ['Baja', 'Media', 'Alta', 'Crítica'] = ['Baja', 'Media', 'Alta', 'Crítica'];
    return {
        category: categories[Math.floor(Math.random() * categories.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        summary: "Análisis simulado: El reporte detalla una posible irregularidad que requiere atención.",
        keyDates: ["Última quincena"],
        locations: ["Área de producción"],
        involvedParties: ["Gerente", "Compañeros"]
    };
}

export const analyzeReport = async (description: string): Promise<AnalyzedReport | null> => {
    if (!ai) {
        return mockAnalyzeReport(description);
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Eres un analista de seguridad para una organización de derechos de los trabajadores sindicalizados. Analiza el siguiente reporte anónimo. Basado en el texto, extrae: 1. Una categoría. 2. Un nivel de severidad (Baja, Media, Alta, Crítica). 3. Un resumen conciso para revisión interna. 4. Una lista de fechas o periodos clave mencionados (ej. "la última quincena", "ayer"). 5. Una lista de lugares o áreas mencionadas (ej. "el área de soldadura", "el departamento de ensamblaje"). 6. Una lista de las partes involucradas (ej. "un gerente de turno", "compañeros", "el departamento de RRHH", pero NUNCA nombres propios para mantener el anonimato). Si un campo no aplica, devuelve un array vacío. No incluyas ninguna información de identificación en tu resumen. El reporte del usuario es: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: {
                            type: Type.STRING,
                            description: 'Por ejemplo: Acoso, Violación de Seguridad, Corrupción, Práctica Laboral Injusta',
                        },
                        severity: {
                            type: Type.STRING,
                            description: 'Baja, Media, Alta, o Crítica',
                        },
                        summary: {
                            type: Type.STRING,
                            description: 'Un resumen breve y neutral del problema.',
                        },
                        keyDates: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: 'Fechas o periodos de tiempo mencionados en el reporte, como "la última quincena" o "ayer".'
                        },
                        locations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: 'Lugares, departamentos o áreas físicas mencionadas, como "área de soldadura".'
                        },
                        involvedParties: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: 'Roles o grupos de personas involucradas, como "gerente" o "compañeros", pero sin nombres propios.'
                        }
                    },
                    required: ['category', 'severity', 'summary', 'keyDates', 'locations', 'involvedParties']
                },
            },
        });
        
        const jsonText = response.text.trim();
        const analyzedData: AnalyzedReport = JSON.parse(jsonText);
        return analyzedData;

    } catch (error) {
        console.error("Error analyzing report with Gemini:", error);
        // Fallback to mock if API fails
        return mockAnalyzeReport(description);
    }
};

export const generateTrackingId = (): string => {
    const prefix = "CATEM";
    const timestamp = Date.now().toString(36).slice(-4);
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${randomPart}-${timestamp}`;
};