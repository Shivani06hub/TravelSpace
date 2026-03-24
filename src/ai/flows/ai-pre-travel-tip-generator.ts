'use server';
/**
 * @fileOverview A Genkit flow for generating pre-travel tips and advice based on destination and package type.
 *
 * - generatePreTravelTips - A function that handles the pre-travel tip generation process.
 * - PreTravelTipGeneratorInput - The input type for the generatePreTravelTips function.
 * - PreTravelTipGeneratorOutput - The return type for the generatePreTravelTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreTravelTipGeneratorInputSchema = z.object({
  destination: z.string().describe('The travel destination (e.g., Paris, Himalayas, Rome).'),
  packageType: z.string().describe('The type of travel package (e.g., Beach, Mountain, Historical, Adventure).'),
});
export type PreTravelTipGeneratorInput = z.infer<typeof PreTravelTipGeneratorInputSchema>;

const PreTravelTipGeneratorOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of relevant pre-travel tips and advice for the given destination and package type.'),
});
export type PreTravelTipGeneratorOutput = z.infer<typeof PreTravelTipGeneratorOutputSchema>;

export async function generatePreTravelTips(
  input: PreTravelTipGeneratorInput
): Promise<PreTravelTipGeneratorOutput> {
  return preTravelTipGeneratorFlow(input);
}

const preTravelTipPrompt = ai.definePrompt({
  name: 'preTravelTipPrompt',
  input: {schema: PreTravelTipGeneratorInputSchema},
  output: {schema: PreTravelTipGeneratorOutputSchema},
  prompt: `You are an expert travel advisor. Your task is to generate specific and helpful pre-travel tips and advice for a traveler based on their destination and package type.

Consider practical aspects like packing essentials, local customs, health precautions, transportation, and recommended activities.

Destination: {{{destination}}}
Package Type: {{{packageType}}}

Generate at least 5 to 7 detailed tips. Format the output as a JSON object with a single key 'tips' which contains an array of strings, where each string is a separate tip.`,
});

const preTravelTipGeneratorFlow = ai.defineFlow(
  {
    name: 'preTravelTipGeneratorFlow',
    inputSchema: PreTravelTipGeneratorInputSchema,
    outputSchema: PreTravelTipGeneratorOutputSchema,
  },
  async input => {
    const {output} = await preTravelTipPrompt(input);
    return output!;
  }
);
