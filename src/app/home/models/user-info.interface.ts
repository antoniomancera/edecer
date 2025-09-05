import { Course } from 'src/app/shared/models/course.model';

export interface UserInfo {
  userName: string;
  currentCourse: Course;
}
