import { IStoryData } from './stories.service';

export const MOCK_STORY_DATA: IStoryData[] = [
  {
    title: 'TITLE 1',
    standFirst: 'Story 1',
    dateCreated: new Date(1996, 2, 1),
    thumbnailImage: {
      link: 'https://via.placeholder.com/1000x80'
    },
    domainLinks: [
      {
      link: "https://www.theaustralian.com.au",
      name: 'The Australian'
    },
      {
      link: "https://www.goldcoastbulletin.com.au",
      name: 'Gold Coast Bulletin'
    },
  ],
    id: {
      value: 'story-1',
      link: undefined
    }
  },
  {
    title: 'TITLE 2',
    standFirst: 'Story 2',
    dateCreated: new Date(2000, 3, 4),
    thumbnailImage: {},
    domainLinks: [],
    id: {
      value: 'story-2',
      link: undefined
    }
  },
  {
    title: 'TITLE 3',
    standFirst: 'Story 3',
    dateCreated: new Date(2010, 5, 8),
    thumbnailImage: {},
    domainLinks: [],
    id: {
      value: 'story-3',
      link: undefined
    }
  },
]