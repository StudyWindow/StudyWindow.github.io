
export default async function create_leaderboard(supabase){
const {data,error}=await supabase
  .from('leaderboard')
  .select()
if(error){
  console.log(error)
}
const new_data=[]
data.forEach(function(i){
  i.avatarUrl=`https://kmxhrbmsuunryhjdogwb.supabase.co/storage/v1/object/public/profile-pictures/${i.user_id}/profile.jpg`
  new_data.push({user:{username:i.username.split('@')[0],avatarUrl:i.avatarUrl},streak:i.streak.split('@')[0]})
})
const rowData = new_data;

// Column Definitions
const columnDefs = [
  {
    headerName: "User",
    field: "user",
    cellRenderer: function(params) {
      const { username, avatarUrl } = params.value;
      return `
        <div style="display: flex; align-items: center;">
          <img src="${avatarUrl}" alt="${username}" style="width:40px; height:40px; border-radius:50%; margin-right:10px;">
          <span>${username}</span>
        </div>
      `;
    },
    minWidth: 200
  },
  {
    headerName: "Streak",
    field: "streak",
    cellRenderer: function(params) {
      return params.value;
    },
 //   cellStyle: { textAlign: "" }
  }
];

// to use myTheme in an application, pass it to the theme grid option
const myTheme = agGrid.themeQuartz
	.withParams({
        accentColor: "#00A2FF",
        backgroundColor: "#21222C",
        borderColor: "#429356",
        borderRadius: 10,
        browserColorScheme: "dark",
        cellHorizontalPaddingScale: 1.0,
        cellTextColor: "#50F178",
        columnBorder: false,
        fontFamily: "Times New Roman",
        fontSize: 12,
        foregroundColor: "#68FF8E",
        headerBackgroundColor: "#21222C",
        headerFontSize: 14,
        headerFontWeight: 700,
        headerTextColor: "#68FF8E",
        headerVerticalPaddingScale: 1.0,
        oddRowBackgroundColor: "#21222C",
        rangeSelectionBackgroundColor: "#FFFF0020",
        rangeSelectionBorderColor: "yellow",
        rangeSelectionBorderStyle: "solid",
        rowBorder: true,
        rowVerticalPaddingScale: 2.0,
        sidePanelBorder: true,
        spacing: 5,
        wrapperBorder: false,
        wrapperBorderRadius: 20
    });

// Grid Options
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: {
    resizable: true,
    sortable: true
  },
  // Enable vertical scrolling
  domLayout: 'autoHeight',
  suppressHorizontalScroll: false,
  pagination: true,
    paginationPageSize: 20,
  theme:myTheme
};

// Get the div and initialize the grid
const eGridDiv = document.getElementById('leaderboard-parent');
agGrid.createGrid(eGridDiv, gridOptions);
}
