'use server';
/**
 * @fileOverview A Genkit flow that provides personalized itinerary suggestions
 * based on a travel package's details and user preferences.
 *
 * - personalizeItinerary - A function that handles the itinerary personalization process.
 * - PersonalizeItineraryInput - The input type for the personalizeItinerary function.
 * - PersonalizeItineraryOutput - The return type for the personalizeItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeItineraryInputSchema = z.object({
  packageDetails: z.object({
    title: z.string().describe('The title of the travel package.'),
    itinerary:
      z.array(z.string()).describe('A day-by-day itinerary of the package.'),
    services:
      z
        .array(z.string())
        .describe(
          'A list of services included in the package (e.g., "Hotel", "Meals", "Guide").'
        ),
  }).describe('Details about the travel package.'),
  userPreferences: z.object({
    interests:
      z
        .array(z.string())
        .describe(
          'A list of the user\'s travel interests (e.g., "hiking", "food tours", "museums", "nightlife").'
        ),
    travelStyle:
      z
        .string()
        .describe(
          'The user\'s preferred travel style (e.g., "adventure", "relaxing", "cultural immersion", "luxury").'
        ),
    budgetPreference:
      z
        .string()
        .optional()
        .describe(
          'The user\'s budget preference (e.g., "budget-friendly", "mid-range", "luxury"). This is optional.'
        ),
  }).describe('The user\'s personal preferences for travel.'),
});
export type PersonalizeItineraryInput = z.infer<typeof PersonalizeItineraryInputSchema>;

const PersonalizeItineraryOutputSchema = z.object({
  personalizedSuggestions:
    z.array(
      z.object({
        category:
          z
            .enum([
              'Itinerary Enhancement',
              'Alternative Activity',
              'Local Experience',
              'Travel Tip',
              'Accommodation Upgrade',
              'Dining Suggestion',
            ])
            .describe('The category of the suggestion.'),
        title: z.string().describe('A concise title for the suggestion.'),
        description:
          z
            .string()
            .describe(
              'A detailed description of the suggestion, explaining how it aligns with the user\'s preferences and enhances the trip.'
            ),
      })
    ).describe('A list of personalized suggestions for the travel package itinerary.'),
});
export type PersonalizeItineraryOutput = z.infer<typeof PersonalizeItineraryOutputSchema>;

export async function personalizeItinerary(
  input: PersonalizeItineraryInput
): Promise<PersonalizeItineraryOutput> {
  return personalizeItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeItineraryPrompt',
  input: {schema: PersonalizeItineraryInputSchema},
  output: {schema: PersonalizeItineraryOutputSchema},
  prompt: `You are an expert travel agent specializing in crafting highly personalized travel experiences.
Your task is to review a given travel package and a traveler's preferences, then suggest relevant itinerary enhancements, alternative activities, or travel tips.

Consider the following package details:
Package Name: "{{packageDetails.title}}"
Current Itinerary:
{{#each packageDetails.itinerary}}
- {{{this}}}
{{/each}}
Included Services:
{{#each packageDetails.services}}
- {{{this}}}
{{/each}}

Here are the traveler's preferences:
Interests: {{#each userPreferences.interests}}- {{{this}}}{{/each}}
Travel Style: {{userPreferences.travelStyle}}
{{#if userPreferences.budgetPreference}}Budget Preference: {{userPreferences.budgetPreference}}{{/if}}

Based on this information, provide 3-5 distinct and actionable suggestions that would enhance the traveler's experience, making the trip more aligned with their personal interests and travel style. Focus on creating unique and memorable experiences. Ensure suggestions are distinct from the existing itinerary unless they are direct enhancements.

Output your suggestions in the specified JSON format. Each suggestion should include a 'category', a 'title', and a 'description'.
`,
});

const personalizeItineraryFlow = ai.defineFlow(
  {
    name: 'personalizeItineraryFlow',
    inputSchema: PersonalizeItineraryInputSchema,
    outputSchema: PersonalizeItineraryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
