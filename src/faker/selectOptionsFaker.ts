import {SelectOptionItemProps} from '../globalUI/libs/SelectOptionSheet';
import {v4 as uuidv4} from 'uuid';
import {faker} from '@faker-js/faker';

const listOptionFake = new Array(30).fill(null).map(() => {
  return {
    value: uuidv4(),
    title: faker.random.word(),
    leftIcon: {
      name: 'check',
      size: 20,
    },
    subTitle: faker.random.words(),
  };
});
export const getSelectOptions = (
  search?: string,
): Promise<SelectOptionItemProps[]> => {
  console.log("getSelectOptions:search", search)
  return new Promise((resolve: any) => {
    resolve(
      listOptionFake.filter(option => option.title.indexOf(search || '') > -1),
    );
  });
};
