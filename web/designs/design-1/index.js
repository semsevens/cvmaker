import React from 'react';
import PropTypes from 'prop-types';
import InlineCss from 'react-inline-css';

let stylesheet;
if (typeof window == 'undefined') {
  const path = require('path');
  var src = path.join(__dirname + '/small.less');
  const lessToCss = require('../../utils/less-to-css').default;
  stylesheet = lessToCss(src);
} else {
  stylesheet = require('!css-loader!less-loader!./small.less');
  stylesheet = stylesheet.toString();
}

const Design1 = (props) => (
  <InlineCss id="cv" componentName="design-1" stylesheet={stylesheet}>
    <style>{`.Design1 .mainDetails{border-bottom-color: ${props.designColor} !important}
             .Design1 .mainArea section .sectionTitle{ color: ${props.designColor} !important}`}</style>
    <div className="Design1">
      <div className="mainDetails">
        <div className="name">
          <span>{props.data.personal.fullname.value}</span>
          <span>{props.data.personal.jobtitle.value}</span>
          <ul>
            <li><span>{props.data.personal.email.value}</span></li>|
            <li><span>{props.data.personal.mobile.value}</span></li>
          </ul>
        </div>
      </div>
      <div className="mainArea">
        <section className="portfolioInfo">
          <ul>
            <li>
              <h3 className="sectionTitle">求职意向</h3>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.summary.value}}></div>
              </div>
            </li>
            <li>
              <h3 className="sectionTitle">自我评价</h3>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.objectives.value}}></div>
              </div>
            </li>
          </ul>
        </section>
        <section className="skillInfo">
          <h3 className="sectionTitle">技能证书</h3>
          <div className="sectionContent">
            <ul>{props.data.skill.list.map((item,i) =>
              <li key={i}>
                <h4>{item.skillCategory.value}</h4>
                <ul>
                  {item.skills.map((skill,j) => 
                    <li key={j}>
                      <span>{skill}</span>
                    </li>
                  )}
                </ul>
              </li>)}
            </ul>
          </div>
        </section>
        <section className="workInfo">
          <h3 className="sectionTitle">工作经验</h3>
          <div className="sectionContent">
            <ul>
              {props.data.job.list.map((item, i) =>
                <li key={i}>
                  <div className="header">
                    <span>{item.jobtitle.value}</span>
                    <span>at</span>
                    <span>{item.company.value}</span>
                  </div>
                  <div className="subDetails">
                    <span>{item.startdate.value}</span>
                    <span>to</span>
                    <span>{item.enddate.value}</span>
                  </div>
                  <h5>职责</h5>
                  <div className="default" dangerouslySetInnerHTML={{__html: item.responsibilities.value}}></div>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section className="educationInfo">
          <h3 className="sectionTitle">教育背景</h3>
          <div className="sectionContent">
            <ul>
              {props.data.education.list.map((item, i) =>
                <li key={i}>
                  <div className="header">
                    <div>{item.degree.value}</div>
                  </div>
                  <div className="subDetails">
                    <span>{item.startdate.value}</span>
                    <span>to</span>
                    <span>{item.enddate.value}</span>
                  </div>
                  <div className="details">
                    <span>From</span>
                    <span>{item.school.value}</span>
                    <span>at</span>
                    <span>{item.location.value}</span>
                  </div>
                  <div className="details">
                    <h5>GPA:</h5>
                    <span>{item.grade.value}</span>
                  </div>
                  <div className="details">
                    {item.description.value && <h5>描述</h5>}
                    <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section className="othersInfo">
          <ul>
            {props.data.misc.list.map((item, i) =>
              <li key={i}>
                <h3 className="sectionTitle">{item.label.value}</h3>
                <div className="sectionContent">
                  <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  </InlineCss>
);

Design1.defaultProps = {
  designColor: '#40a7ba'
};

Design1.propTypes = {
  data: PropTypes.object.isRequired,
  designColor: PropTypes.string
};

export default Design1;
