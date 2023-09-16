
export class Book{
    name:string;
    id:number;
    pageCount:number;
    publishedDate:string;
    thumbnailUrl:string;
    shortDescription:string;
    longDescription:string;
    status:string;
    authors:string[];
    categories:string[]
    
    addAuthor(author){
        this.authors.push(author);
    }

    addCategory(category){
        this.categories.push(category);
    }
}