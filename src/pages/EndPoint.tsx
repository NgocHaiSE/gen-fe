import { server } from './Api';

export const mutationLungGeneEp = `${server}/mutation-lung-gene`;
export const mutationLiverGeneEp = `${server}/mutation-liver-gene`;
export const mutationBreastGeneEp = `${server}/mutation-breast-gene`;
export const mutationThyroidGeneEp = `${server}/mutation-thyroid-gene`;
export const mutationColorectalGeneEp = `${server}/mutation-colorectal-gene`;

export const mutationLung20GeneEp = `${server}/mutation-lung-gene/top20`;
export const mutationLiver20GeneEp = `${server}/mutation-liver-gene/top20`;
export const mutationBreast20GeneEp = `${server}/mutation-breast-gene/top20`;
export const mutationThyroid20GeneEp = `${server}/mutation-thyroid-gene/top20`;
export const mutationColorectal20GeneEp = `${server}/mutation-colorectal-gene/top20`;

export const nomalLungGeneEp = `${server}/nomal-lung-gene`;
export const nomalLiverGeneEp = `${server}/nomal-liver-gene`;
export const nomalBreastGeneEp = `${server}/nomal-breast-gene`;
export const nomalThyroidGeneEp = `${server}/nomal-thyroid-gene`;
export const nomalColorectalEp = `${server}/nomal-colorectal-gene`;

export const testCaseEp = `${server}/test-case`;
export const addTestCaseEp = `${server}/upload`;

export const drugsInformationEp = `${server}/drugs-information`;
export const drugArticlesEp = `${server}/drugs-information/find`;

export const geneAndMutationEp = `${server}/mutation`;
export const geneMutationArticlesEp = `${server}/mutation/find`;  

export const loginEp = `${server}/user/login`;
