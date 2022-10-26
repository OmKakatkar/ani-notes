import dayjs from 'dayjs';
import {
  DATE_LATEST,
  DATE_OLDEST,
  PRIORITY_ALL,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
} from '../constants/reducer-constants';
import { NoteType } from '../services/auth-service';

const filterByPriority = (notes: NoteType[], priority: string) => {
  switch (priority) {
    case PRIORITY_HIGH:
      return notes.filter((note) => note.priority === 'high');
    case PRIORITY_MEDIUM:
      return notes.filter((note) => note.priority === 'medium');
    case PRIORITY_LOW:
      return notes.filter((note) => note.priority === 'low');
    case PRIORITY_ALL:
      return notes;
    default:
      return notes;
  }
};

const filterByTag = (notes: NoteType[], filterTags: string[]) => {
  if (filterTags.length) {
    return notes.filter(({ tags }) =>
      tags.some((tag) => filterTags.includes(tag))
    );
  }
  return notes;
};

const sortByDate = (notes: NoteType[], dateTime: string) => {
  switch (dateTime) {
    case DATE_OLDEST:
      //FIXME:
      //@ts-ignore
      return [...notes].sort((a, b) => dayjs(a.updatedAt) - dayjs(b.updatedAt));
    case DATE_LATEST:
      //FIXME:
      //@ts-ignore
      return [...notes].sort((a, b) => dayjs(b.updatedAt) - dayjs(a.updatedAt));
    default:
      return notes;
  }
};

const searchNotes = (notes: NoteType[], search: string) => {
  if (search) {
    return notes.filter(({ title }) =>
      title.toString().toLowerCase().includes(search.toString().toLowerCase())
    );
  }
  return notes;
};

export const getFilteredNotes = (
  notes: NoteType[],
  filters: {
    search: string;
    priority: string;
    tags: string[];
    dateTime: string;
  }
) => {
  const searchedNotes = searchNotes(notes, filters.search);
  const priorityFiltered = filterByPriority(searchedNotes, filters.priority);
  const tagFiltered = filterByTag(priorityFiltered, filters.tags);
  const dateSorted = sortByDate(tagFiltered, filters.dateTime);
  return dateSorted;
};
