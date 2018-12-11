import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cls3: {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10,
    strokeWidth: 2,
  },
  cls2: {
    strokeLnecap: 'round',
  },
  cls4: {
    fill: 'currentColor',
    stroke: '#707070'
  },
  svgIcon: {
    width: '3rem',
    marginLeft: '-1rem',
    marginRight: '-1rem',
  },
});

function orderIcon(props) {
  const { classes } = props;
  return (
    <SvgIcon viewBox='0 0 27 27' className={classes.svgIcon}>
      <g id="iconfinder_order_2639879" transform="translate(-40 -448)">
        <g id="iconfinder_order_2639879-2" data-name="iconfinder_order_2639879" className={classes.root} transform="translate(37 445)">
          <g id="Symbol_1_1" data-name="Symbol 1 – 1">
            <path id="Path_403" data-name="Path 403" className={[classes.cls2, classes.cls3].join(' ')} d="M7,22V4H25V22a4,4,0,0,1-4,4" />
          </g>
          <path id="Path_404" data-name="Path 404" className={[classes.cls2, classes.cls3].join(' ')} d="M17,22H4a4,4,0,0,0,4,4H21A4,4,0,0,1,17,22Z" />
          <line id="Line_44" data-name="Line 44" className={classes.cls3} x2="6" transform="translate(15 13)" />
          <line id="Line_45" data-name="Line 45" className={classes.cls3} x2="2" transform="translate(11 13)" />
          <line id="Line_46" data-name="Line 46" className={classes.cls3} x2="6" transform="translate(15 17)" />
          <line id="Line_47" data-name="Line 47" className={classes.cls3} x2="2" transform="translate(11 17)" />
          <line id="Line_48" data-name="Line 48" className={classes.cls3} x2="6" transform="translate(15 9)" />
          <line id="Line_49" data-name="Line 49" className={classes.cls3} x2="2" transform="translate(11 9)" />
          <path id="Path_405" data-name="Path 405" className={classes.cls4} d="M17,22H4a4,4,0,0,0,4,4H21A4,4,0,0,1,17,22Z" />
        </g>
      </g>
    </SvgIcon>
  );
}

export default withStyles(styles)(orderIcon);