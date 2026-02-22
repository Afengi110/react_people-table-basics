import React, { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const found = people.find(p => p.name === name);

  if (found) {
    return (
      <NavLink
        to={`/people/${found.slug}`}
        className={found.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </NavLink>
    );
  }

  return <span>{name}</span>;
};

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  const { slug: selectedSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <Loader />
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={
                      person.slug === selectedSlug
                        ? 'has-background-warning'
                        : ''
                    }
                  >
                    <td>
                      <NavLink
                        to={`/people/${person.slug}`}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {person.name}
                      </NavLink>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink name={person.motherName} people={people} />
                    </td>
                    <td>
                      <PersonLink name={person.fatherName} people={people} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
