import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import { colors } from '../../../shared/config'
import Loading from '../../../shared/Loader'

export default class StudentCalendar extends Component {

    state = {
        loading: true
      };


    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 300)
      }



    getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ]; break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ]; break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ]; break;
          default:
        }
        return listData || [];
      }
      
      dateCellRender(value) {
        const listData = this.getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.content}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))
            }
          </ul>
        );
      }
      
      getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      monthCellRender(value) {
        const num = this.getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }


    render() {

        if(this.state.loading){
            return (
                <Loading text={"Refreshing..."}/>
            )
        }


        return (
            <div style={{margin: '24px', padding: '24px',    backgroundColor: 'white'}}>
                <h2 style={{marginTop: 24, color: colors.accent}}> Your Calendar</h2>
                <Calendar fullscreen={true}  />
            </div>
        );
    }
}
