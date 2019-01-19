import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { getCourseSchedule } from '../api/student';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from '../ui/Card';
import Icon from '../ui/Icon';
import Badge from '../ui/Badge';
import List from '../ui/List';
import Course from '../features//Course';
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
          <div>
            <CardHeaderTitle>Courses</CardHeaderTitle>
            <CardHeaderSubtitle>
              <Badge inline badgeContent={totalCredits} bg="stratosphere">
                Credits
              </Badge>
            </CardHeaderSubtitle>
          </div>
          <Icon icon={faChalkboardTeacher} color="stratosphere" size="2x" />
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
