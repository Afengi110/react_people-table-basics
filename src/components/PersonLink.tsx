// components/PersonLink.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person | null;
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, name }) => {
  if (!name && !person) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </NavLink>
  );
};
