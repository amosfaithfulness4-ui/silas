import dash
from dash import dcc, html

# Create A Dash Application
app = dash.Dash(__name__)

# Define The Layout Of The Dashboard
app.layout = html.Div(
    children=[
        html.H1('My Dashboard'),
        dcc.Graph(
            id='My-Graph',
            figure={
                'data': [
                    {'x': [1, 2, 3], 'y': [4, 1, 2], 'type': 'bar', 'name': 'bar chart'},
                    {'x': [1, 2, 3], 'y': [2, 4, 5], 'type': 'line', 'name': 'line chart'},
                ],
                'layout': {
                    'title': 'Graph title',
                    'xaxis': {'title': 'X-axis'},
                    'yaxis': {'title': 'Y-axis'},
                }       
            }
        )
    ]
)

# Run The Application
if __name__ == '__main__':
    app.run(debug=True)