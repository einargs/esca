export class Recipe {
  $key: string;

  constructor(
    public owner_id: string,
    public name = "",
    public time = 0,
    public ingredients: string[] = [],
    public instructions = ""
  ) {}
}
