import { z } from 'zod';

const Person = z.object({
  name: z.string().min(1).max(100),
  homeworld: z.string().url(),
  films: z.array(
    z.string().url({
      message: 'films must be an array of valid urls',
    })
  ),
  height: z.coerce.number(),
});

type Person = z.infer<typeof Person>;

async function fetchPerson(): Promise<Person> {
  const results = await fetch(
    'https://swapi.dev/api/people/1'
  ).then((res) => res.json());

  console.log('Fetch results: ', results);
  const parsedResults = Person.parse(results);
  console.log('zzzzzzzz Zod parsed: ', parsedResults);

  return parsedResults;
}

fetchPerson().then((person) => {
  console.log(person.name);
  console.log(person.height);
});
