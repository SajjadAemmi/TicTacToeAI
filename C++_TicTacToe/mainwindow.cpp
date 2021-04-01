#include "mainwindow.h"
#include "ui_mainwindow.h"

QPushButton* btn[3][3];

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    for (int i = 0;;) {
        for (;;) {

        }
    }
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::btnClicked()
{

}
