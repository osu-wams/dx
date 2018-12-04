import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { getCourseSchedule } from '../api/student';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from './layout/Card';
import Icon from './layout/Icon';
import Badge from './layout/Badge';
import List from './layout/List';
import Course from './Course';
import { titleCase } from '../util/helpers';

export default class Courses extends Component {
  state = {
    courses: [],
    courseAttributes: null,
    showCourse: false
  };

  // Hides or shows course details
  toggleCourse = courseAttributes => {
    this.setState(state => ({
      showCourse: !state.showCourse,
      courseAttributes
    }));
  };

  componentDidMount() {
    getCourseSchedule()
      .then(courses => this.setState({ courses }))
      .catch(err => console.log(err));
  }

  render() {
    const { courses, showCourse, courseAttributes } = this.state;
    if (!courses) {
      return null;
    }
    const totalCredits = courses.reduce(
      (accumulator, current) => accumulator + current.attributes.creditHours,
      0
    );

    return (
      <Card color="stratosphere">
        <CardHeader>
          <CardHeaderTitle>
            <Icon icon={faChalkboardTeacher} color="stratosphere" />
            Courses
          </CardHeaderTitle>
          <CardHeaderSubtitle>
            <Badge inline badgeContent={totalCredits} bg="stratosphere">
              Credits
            </Badge>
          </CardHeaderSubtitle>
        </CardHeader>
        <CardContent>
          <List>
            {courses.map(
              ({ id, attributes, attributes: { courseTitle, courseNumber, courseSubject } }) => (
                <li key={id}>
                  <button type="button" onClick={() => this.toggleCourse(attributes)}>
                    <span>
                      {titleCase(courseTitle)}
                      <div>
                        {courseSubject} {courseNumber}
                      </div>
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </li>
              )
            )}
          </List>
          {showCourse && <Course attributes={courseAttributes} toggleCourse={this.toggleCourse} />}
        </CardContent>
      </Card>
    );
  }
}
