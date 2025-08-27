
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
        summary: "Análisis simulado: El reporte detalla una posible irregularidad que requiere atención."
    };
}

export const analyzeReport = async (description: string): Promise<AnalyzedReport | null> => {
    if (!ai) {
        return mockAnalyzeReport(description);
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Eres un analista de seguridad para una organización de derechos de los trabajadores sindicalizados. Analiza el siguiente reporte anónimo. Basado en el texto, proporciona una categoría, un nivel de severidad (Baja, Media, Alta, Crítica) y un resumen conciso para revisión interna. No incluyas ninguna información de identificación en tu resumen. El reporte del usuario es: "${description}"`,
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
                    },
                    required: ['category', 'severity', 'summary']
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